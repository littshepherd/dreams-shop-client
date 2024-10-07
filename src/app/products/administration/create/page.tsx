"use client";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
  Button,
  Input,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  getCategories,
  saveProductFetch,
  uploadImage,
} from "@/app/products/administration/actions";
import { useEffect, useState } from "react";
import Image from "next/image";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  multiple: "multiple",
});

interface IFormInput {
  imagesFiles: FileList;
  images: {
    image_url: string;
  }[];
  name: string;
  materials: string;
  description: string;
  price: number;
  category: number;
}

export default function Create() {
  const [images, setImages] = useState<File[] | null>(null);
  const [categories, setCategories] = useState([]);
  const { handleSubmit, control, setValue } = useForm<IFormInput>({
    defaultValues: {
      images: [],
      category: 1,
      price: 0,
      description: "",
      materials: "",
      name: "",
    },
  });
  const imageHandler = (files: FileList | null) => {
    if (files) {
      setValue("imagesFiles", files);
      setImages(() => Array.from(files));
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const formData = new FormData();
    const namedImages = [];
    Array.from(data.imagesFiles).forEach((image) => {
      const newImage = new File([image], Date.now() + image.name, {
        type: image.type,
      });
      namedImages.push(newImage);
      formData.append("images", newImage);
    });

    const r2Response = await uploadImage(formData);

    r2Response.forEach((response, index) => {
      console.log(formData.get("images"));
      response.$metadata.httpStatusCode === 200 &&
        setValue(`images.${index}`, {
          image_url: "images/" + namedImages[index].name,
        });
    });

    delete data.imagesFiles;
    const saveProductResponse = await saveProductFetch(data);
    console.log(saveProductResponse);
  };

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    const fetch = async () => {
      const categoriesRequest = await getCategories();
      setCategories(() =>
        categoriesRequest.map((category) => ({
          name: category.name,
          id: category.id,
        }))
      );
    };
    fetch();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-8">
          <h2 className="text-3xl">Crear producto</h2>
        </div>
        <Box className="grid grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Nombre de producto"
                variant="outlined"
                {...field}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Valor de producto"
                variant="outlined"
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Descripción de producto"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Controller
            name="materials"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Materiales"
                variant="outlined"
                {...field}
              />
            )}
          />
          <div className="w-full">
            <InputLabel id="demo-simple-select-label">
              Seleccionar opción
            </InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={"default"}
                  label="Seleccionar opción"
                  className="w-full"
                  {...field}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name ?? "noname"}
                    </MenuItem>
                  ))}
                </Select>
              )}
              // <Select
              //     labelId="demo-simple-select-label"
              //     id="demo-simple-select"
              //     value={''}
              //     label="Seleccionar opción"
              //     className="w-full"
              // // onChange={handleChange}
            />
            {/* //     { categories.map((category) => (<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>) ) }
                        // </Select> */}
          </div>

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            //   startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => imageHandler(event.target.files)}
              multiple
            />
          </Button>
        </Box>
        <div className=" mt-10 flex gap-4">
          {images &&
            images?.map((file) => (
              <Image
                src={URL.createObjectURL(file)}
                width={100}
                height={100}
                alt="image"
                key={file.name}
              />
            ))}
        </div>
        <Input type="submit" />
      </form>
    </div>
  );
}
