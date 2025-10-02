"use client";

import React, { useActionState, useState } from "react";
import Link from "next/link";
import { generateShortUrl } from "@/actions/shortUrl";

const Shorten = () => {
  const [state, formAction, isPending] = useActionState(generateShortUrl, { initialState: null });

  return (
    <main className="w-[100vw]  h-[100vh] py-20 ">
      <h1 className="text-center text-3xl font-bold text-white bg-blue-200/20 py-5 rounded-xl w-[80%] mx-auto">
        Grootly
      </h1>
      <div className="flex flex-col items-center justify-center my-20 py-5 w-[80vw]  mx-auto rounded-2xl text-white bg-blue-200/20 ">
        <h2 className="font-bold text-2xl my-5">Url Shortner</h2>
        <form action={formAction} className="flex flex-col items-center gap-2.5 py-4 w-[100%] mx-auto rounded-2xl outline-none border-none">
          <input
            name="originalUrl"
            className="bg-blue-200/20 rounded-xl px-4 py-2 w-[80%]"
            type="text"
            placeholder="Enter Url ex. https://www.google.com"
          />

          {/* <div className="text-red-500">{urlError}</div> */}

          <input
            name="shortUrl"
            className="bg-blue-200/20 rounded-xl px-4 py-2 w-[80%]"
            type="text"
            placeholder="Enter Name ex. nomi or google"
            
          />
          {state.error && <div className="text-red-500">{state.message}</div>}

          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-400 font-bold rounded-xl px-4 py-2 my-2 text-white disabled:bg-blue-300"
          >
            {isPending ? "Processing" : "Shorten"}
          </button>

          {state.success && (
            <>
              <p className="font-bold mt-2">Your Short Url:</p>
              <code className="text-center">
                <a target="_blank" rel="noopener noreferrer" href={state.generatedUrl} className="">
                  {state.generatedUrl}
                </a>
              </code>
            </>
          )}
        </form>
      </div>
    </main>
  );
};

export default Shorten;
