import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { trpc } from "../../utils/trpc";
import Modal from "../Modal";

export const tagCreateSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

type TagFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TagForm = ({ isOpen, onClose }: TagFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    name: string;
    description: string;
  }>({
    resolver: zodResolver(tagCreateSchema),
  });

  const tagRouter = trpc.useContext().tag;

  const createTag = trpc.tag.createTag.useMutation({
    onSuccess: () => {
      toast.success("Tag successfully created 🥳");
      reset();
      onClose();
      tagRouter.getTags.invalidate();
    },
  });

    return (
    <div className="writeModalBox">
      <Modal isOpen={isOpen} onClose={onClose} title="Create a tag" >
      <form
        onSubmit={handleSubmit((data) => createTag.mutate(data))}
        className="relative flex flex-col items-center justify-center space-y-4"
      >
        <input
          type="text"
          id="name"
          className="writeTitle invertButton h-full w-full rounded-xl  p-4 outline-none "
          placeholder="name of the tag"
          {...register("name")}
        />
        <p className="w-full pb-2 text-left text-sm text-red-500">
          {errors.name?.message}
        </p>
        <input
          type="text"
          id="description"
          className="writeTitle invertButton h-full w-full rounded-xl  p-4 outline-none "
          placeholder="description"
          {...register("description")}
        />
        <p className="w-full pb-2 text-left text-sm text-red-500">
          {errors.description?.message}
        </p>
        <div className="flex w-full justify-end">
          <button
            className="writeTitle invertButton w-fit space-x-3 whitespace-nowrap rounded px-4 py-2 text-right text-sm transition"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
      </Modal>
    </div>
  );
};

export default TagForm;
