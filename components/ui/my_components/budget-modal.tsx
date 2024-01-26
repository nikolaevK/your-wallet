"use client";
// Executes on the client

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useBudgetModal } from "@/hooks/use-budget-modal";
import Modal from "@/components/ui/my_components/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";

const formSchema = z.object({
  budgetName: z.string().min(3),
});

type FormSchema = z.infer<typeof formSchema>;

export default function BudgetModal() {
  const { isOpen, onClose } = useBudgetModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // extracting the type from formSchema
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budgetName: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    console.log("submit");
  }
  return (
    <Modal
      title="Create Budget"
      description="Add a new budget to manage expenses and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="budgetName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Budget"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin border-2 border-t-2 border-white-500 border-t-blue-600  h-5 w-5 border-spacing-1 rounded-full"></div>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
