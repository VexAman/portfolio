"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setLoading(false);
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none border-2 border-blue-100 p-4 drop-shadow-sml shadow-blue-700   md:rounded-2xl md:p-8 mb-16 ">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Contact Me
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Fill out the form below, and I'll get back to you as soon as possible.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" name="name" placeholder="Full Name" type="text" value={formData.name} onChange={handleChange} required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Your Email</Label>
          <Input id="email" name="email" placeholder="xyz@example.com" type="email" value={formData.email} onChange={handleChange} required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="message">Your Message</Label>
          <Input id="message" name="message" placeholder="Type your message here..." type="text" value={formData.message} onChange={handleChange} required />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
          <BottomGradient />
        </button>

        {success && <p className="mt-4 text-green-500 text-sm">Message sent successfully!</p>}
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
