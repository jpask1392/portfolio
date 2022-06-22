export const handleContactFormSubmit = async (data: any) => {
  console.log(data)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(false);
    }, 2000)
  });
}