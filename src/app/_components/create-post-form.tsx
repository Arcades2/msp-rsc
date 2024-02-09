import React from "react";
import { createPostInput } from "@/common/validation/post";
import { api } from "@/trpc/react";
import { type RouterInputs } from "@/trpc/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function CreatePostForm() {
  const form = useForm<z.infer<typeof createPostInput>>({
    resolver: zodResolver(createPostInput),
    defaultValues: {
      description: "",
      url: "",
    },
  });

  const utils = api.useContext();
  const createPostMutation = api.post.createPost.useMutation({
    onSettled: async () => {
      await utils.post.infiniteFollowedPosts.invalidate();
    },
  });

  const onSubmit = (values: RouterInputs["post"]["createPost"]) => {
    createPostMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} rows={3} placeholder="Description..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="YouTube or SoundCloud url..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Post</Button>
      </form>
    </Form>
  );
}

export default CreatePostForm;
