// https://blog.logrocket.com/create-drag-and-drop-component-react-dropzone/
// https://react-dropzone.js.org

import cn from 'classnames';
import { useState, useEffect, useContext, useCallback } from 'react';
import { FormContext } from "@/components/modules/Form";
import { useDropzone } from 'react-dropzone';
import DynamicIcon from '@/components/icons/DynamicIcon';
import toast, { Toaster } from "react-hot-toast";

const Dropzone = ({
  id,
  type = "text",
  placeholder,
  required,
}) => {
  const [images, setImages] = useState([]);
  const { formData, setFormData } = useContext(FormContext);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    open,
    fileRejections,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/heic': ['.heic'],
    },
    onDrop: (acceptedFiles) => {
      // add preview to file object
      setImages(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        toast.error(
          rejection.errors[0].message
        );
      })
    },
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: 10000000,
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => images.forEach(image => URL.revokeObjectURL(image.preview));
  }, []);

  useEffect(() => {
    setFormData({...formData, [id]: images[0]})
  }, [images])

  return (
    <>
    <Toaster position="bottom-center" />

    <div
      {...getRootProps({
        className: cn("p-5 shadow-md aspect-[10/7] flex rounded-lg", {
          "bg-green-300" : isDragAccept,
          "bg-red-400": isDragReject,
        })
      })}
    >
      <input {...getInputProps({
        // required: required,
        name: id, 
        style: { display: 'block'},
        className:"sr-only"
      })} />

      <div 
        onClick={open} 
        className="w-full rounded-md border-lightBlue border-2 p-5 cursor-pointer text-center"
      >
        <div className={cn("flex flex-col justify-center h-full")}>
          <div className="mx-auto mb-4">
            <DynamicIcon type="fileUpload" className="fill-blue" />
          </div>
          <p className="text-xl">Select a photo to upload</p>
          <p className="text-sm text-greyText">or drag and drop here.</p>
        </div>
      </div>
    </div>

    <aside>
      {
        images.length ? (
          <>
            <p className="mb-3 mt-5">Image Preview:</p>
            <div className="rounded-lg overflow-hidden">
              <img
                src={images[0].preview}
                className="w-full h-auto"
                onLoad={() => { URL.revokeObjectURL(images[0].preview) }}
              />
            </div>
          </>
        ) : null
      }
    </aside>
    </>
  )
}

export default Dropzone;