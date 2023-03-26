import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiXMark } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "../../utils/trpc";
import { toast } from "react-hot-toast";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type CommentSidebarProps = {
  showCommentSidebar: boolean;
  setShowCommentSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
};

type CommentFormType = { text: string };

export const commentFormSchema = z.object({
  text: z.string().min(3),
});

const CommentSidebar = ({
  showCommentSidebar,
  setShowCommentSidebar,
  postId,
}: CommentSidebarProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CommentFormType>({
    resolver: zodResolver(commentFormSchema),
  });

  const postRoute = trpc.useContext().post;

  const submitComment = trpc.post.submitComment.useMutation({
    onSuccess: () => {
      toast.success("🥳");
      postRoute.getComments.invalidate({
        postId,
      });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getComments = trpc.post.getComments.useQuery({
    postId,
  });

  return (
    <Transition.Root show={showCommentSidebar} as={Fragment}>
      <Dialog as="div" onClose={() => setShowCommentSidebar(false)}>
        <div className="fixed right-0 top-0">
          <Transition.Child
            enter="transition duration-1000"
            leave="transition duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="dialogSidePanel relative h-screen w-[200px] shadow-md sm:w-[400px]">
              <div className="dialogSidePanelInner flex h-full w-full flex-col overflow-scroll px-6">
                <div className="mt-10 mb-5 flex items-center justify-between  text-xl">
                  <div>
                    <HiXMark
                      className="dialogCloseBtn cursor-pointer"
                      onClick={() => setShowCommentSidebar(false)}
                    />
                  </div>
                  <h2 className="dialogHeader">Responses (4)</h2>
                </div>

                <form
                  onSubmit={handleSubmit((data) => {
                    submitComment.mutate({
                      ...data,
                      postId,
                    });
                  })}
                  className="my-6 flex flex-col items-end space-y-5"
                >
                  <textarea
                    id="comment"
                    rows={3}
                    className="writeTitle invertButton w-full rounded-xl  p-4 shadow-lg outline-none"
                    placeholder="What are your thoughts?"
                    {...register("text")}
                  />
                  {isValid && (
                    <button
                      type="submit"
                      className="writeTitle invertButton flex items-center space-x-3 rounded  px-4 py-2 transition  "
                    >
                      Comment
                    </button>
                  )}
                </form>

                <div className="commentBox flex flex-col items-center justify-center space-y-6">
                  {getComments.isSuccess &&
                    getComments.data.map((comment) => (
                      <div
                        className="flex w-full flex-col space-y-2 pb-4 last:border-none"
                        key={comment.id}
                      >
                        <div className="flex w-full items-center space-x-2 text-xs">
                          <div className="relative h-8 w-8 rounded-full bg-blue-600"></div>
                          <div>
                            <p className="font-semibold">{comment.user.name}</p>
                            <p>{dayjs(comment.createdAt).fromNow()}</p>
                          </div>
                        </div>
                        <div className="text-sm">
                          {comment.text}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CommentSidebar;
