import clsx from "clsx";
import { useEffect, useLayoutEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Image, Tooltip } from "antd";
import { arrayMove } from "@dnd-kit/sortable";
import { ReactSortable } from "react-sortablejs";

import { IconDelete, IconUploadImage } from "../icons";

const acceptImageTypes = {
  "image/jpeg": [],
  "image/png": [],
  "image/gif": [],
  "image/svg+xml": [],
};

export default function UploadImage({
  images = [],
  setImages,
  width,
  height = width,
  title = "Add file",
  disabled = false,
  multiple = false,
  limit = 3,
}) {
  const [urlImages, setUrlImages] = useState([]);
  const handleEffect = () => {
    urlImages.forEach((url) => URL.revokeObjectURL(url));

    if (typeof images === "string") {
      setUrlImages([images]);
    }

    if (images instanceof File) {
      setUrlImages([URL.createObjectURL(images)]);
    }

    if (images instanceof Array) {
      setUrlImages(
        images.map((image) =>
          image instanceof File ? URL.createObjectURL(image) : image
        )
      );
    }

    if (!images) {
      setUrlImages([]);
    }
  };

  const limitImages = multiple ? limit : 1;
  let count = images instanceof Array ? images.length : images ? 1 : 0;

  if (multiple && limit > 1) {
    useEffect(handleEffect, [images instanceof Array ? images.length : images]);
  } else {
    useLayoutEffect(handleEffect, [
      images instanceof Array ? images.length : images,
    ]);
  }

  const handleUpload = (files: File[]) => {
    if (
      disabled ||
      files.length === 0 ||
      (limitImages && count + files.length > limitImages)
    )
      return;

    setImages(
      multiple
        ? [...(images instanceof Array ? images : [images]), ...files]
        : files[0]
    );

    count += files.length;
  };

  const handleDeleteClick = (index: number) => {
    setImages(
      images instanceof Array
        ? images.filter((_, i) => i !== index)
        : multiple
        ? []
        : null
    );
  };

  const handleSort = ({ newIndex, oldIndex }) => {
    setImages(arrayMove(images, oldIndex, newIndex));
  };

  return (
    <div
      className="rounded-md flex justify-start flex-col"
      style={{ minHeight: height }}
    >
      <div className="flex gap-4 flex-wrap relative" style={{ height, width }}>
        {((multiple && count < limitImages) || (!multiple && count == 0)) && (
          <Dropzone
            disabled={disabled}
            multiple={multiple}
            accept={acceptImageTypes}
            onDrop={(acceptedFiles) => handleUpload(acceptedFiles)}
          >
            {({ getRootProps }) => (
              <div
                className={clsx(
                  `flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg  `,
                  disabled
                    ? "bg-gray-100"
                    : "cursor-pointer bg-gray-50 hover:bg-gray-100"
                )}
                {...getRootProps()}
                style={{ height, width }}
              >
                <IconUploadImage />
                <div className="flex flex-col items-center justify-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                    {title}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    SVG, PNG, JPG, GIF
                    {multiple && limit && <p>(Tối đa {limit} file)</p>}
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
        )}
        <ReactSortable
          list={urlImages}
          setList={() => {}}
          onEnd={(event) => handleSort(event)}
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          className="flex gap-4 flex-wrap"
          disabled={!multiple || limit == 1}
          style={{ height, width }}
        >
          {urlImages.map((image, index) => (
            <div
              className={clsx(
                "relative group",
                disabled ? "bg-gray-100" : "cursor-pointer"
              )}
              key={index}
              onClick={(e) => e.stopPropagation()}
              style={{ height, width }}
            >
              <Image
                src={image}
                alt="Ảnh upload"
                style={{ height, width }}
                className="object-cover rounded-md"
                wrapperStyle={{ height, width }}
              />
              {!disabled ? (
                <div
                  style={{
                    height,
                    width,
                  }}
                  className={`absolute hidden bg-[#0000004D] group-hover:flex duration-500 transition top-0 rounded-md  justify-center items-center gap-2`}
                >
                  <Tooltip color={"red"}>
                    <IconDelete
                      className="text-white text-[20px] hover:text-red-600 cursor-pointer w-8 h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(index);
                      }}
                    />
                  </Tooltip>
                </div>
              ) : null}
            </div>
          ))}
        </ReactSortable>
      </div>
    </div>
  );
}
