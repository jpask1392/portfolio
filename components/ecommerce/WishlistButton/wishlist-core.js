/**
 * This is a modified version of the flexi wishlist core javascript.
 */

const wishlistHostname = 'https://prod-api.wishlist.plutocracy.io/api'

// window.addEventListener('load', async function initLoadFunctions() {
// 	checkProductInWishlist()
// 	processButtonListeners()
// })

async function initWishlistGenie(customerEmail, myShopifyDomain) {
	const storeId = await getRequest(`${wishlistHostname}/wishlist/storeid/${myShopifyDomain}`)
	window['wishlistStoreId'] = storeId.id
	if (customerEmail) {
		await getWishlistByEmail(customerEmail)
	} else {
		if (getWishlistIdFromLocalStorage()) {
			getWishlistById(getWishlistIdFromLocalStorage())
		}
	}
}

function getWishlistIdFromLocalStorage() {
	return localStorage.getItem('wishlistId')
}

function setWishlistIdInLocalStorage(wishlistId) {
	if (!wishlistId || wishlistId == 'undefined') {
		return
	}
	return localStorage.setItem('wishlistId', wishlistId)
}

function getWishlistFromLocalStorage() {
	return JSON.parse(localStorage.getItem('wishlist'))
}

function setWishlistInLocalStorage(wishlist) {
	if (!wishlist.wishlistId) {
		return
	}
	return localStorage.setItem('wishlist', JSON.stringify(wishlist))
}

async function getWishlistById(wishlistId) {
	const url = `${wishlistHostname}/wishlist/id/${window['wishlistStoreId']}`
	const wishlist = await postRequest(url, { wishlistId: wishlistId })
	setWishlistInLocalStorage(wishlist)
	return wishlist
}

async function getWishlistByEmail(email) {
	const url = `${wishlistHostname}/wishlist/email/${window['wishlistStoreId']}`
	const wishlist = await postRequest(url, { email: email })
	setWishlistIdInLocalStorage(wishlist.id)
	setWishlistInLocalStorage(wishlist)
	return wishlist
}

async function postRequest(url, postBody) {
	const fetchConfig = {
		method: 'POST',
		body: JSON.stringify(postBody),
		headers: {
			'Content-Type': 'application/json',
		},
	}
	if (!postBody.wishlistId) {
		delete postBody.wishlistId
	}
	return fetch(url, fetchConfig)
		.then((response) => response.json())
		.then((data) => {
			return data
		})
		.catch((err) => {
			console.error('Error during post request:', err)
			return err
		})
}

async function getRequest(url) {
	return fetch(url)
		.then((response) => response.json())
		.then((data) => {
			return data
		})
		.catch((err) => {
			return err
		})
}

async function constructPostBody(event, meta, eventType) {
	return {
		event: {
			...event,
		},
		wishlistId: getWishlistIdFromLocalStorage(),
		eventType: eventType,
		meta: {
			...meta,
		},
	}
}

async function associateWishlistWithEmail(email) {
	const postBody = await constructPostBody({}, {}, 'wishlist/add')
	postBody.email = email
	return await postRequest(postBody)
}

async function shareWishlistWithEmail(email, recipient) {
	const postBody = await constructPostBody(event, meta, 'user/shared-wishlist')
	postBody.email = email
	postBody.meta.event.receipient = recipient
	return await postRequest(postBody)
}

export async function addToWishlist(productHandle, meta, variantId) {
	const event = await defaultProductConstructor(productHandle, variantId)
	const postBody = await constructPostBody(event, meta, 'wishlist/add')
	const wishlist = await postRequest(`${wishlistHostname}/wishlist/event/${window['wishlistStoreId']}`, postBody)
	if (!wishlist.statusCode) {
		setWishlistIdInLocalStorage(wishlist.wishlistId)
		setWishlistInLocalStorage(wishlist)
	}
	return wishlist
}

async function removeFromWishlist(productHandle, meta) {
	const event = await defaultProductConstructor(productHandle, null)
	const postBody = await constructPostBody({ id: event.id }, meta, 'wishlist/remove')
	const wishlist = await postRequest(`${wishlistHostname}/wishlist/event/${window['wishlistStoreId']}`, postBody)
	if (!wishlist.statusCode) {
		setWishlistInLocalStorage(wishlist)
	}
	return wishlist
}

async function defaultProductConstructor(productHandle, variantId) {
	const productJson = await getRequest(`${window.location.origin}/products/${productHandle}.json`)
	const event = { ...productJson.product }
	if (variantId) {
		event.selectedVariant = productJson.product.variants.find((x) => x.id == variantId)
	}
	return event
}

function getProductWishlistStatus(productId) {
	const wishlist = getWishlistFromLocalStorage()
	if (wishlist && wishlist.events) {
		if (wishlist.events.find((x) => x.objectId == productId)) {
			return true
		}
	}
	return false
}
