import React, { useState } from "react";
import { Button } from "flowbite-react";

function PremiumScreen() {
  const [planSelected, setPlanSelected] = useState<number>(0);

  const handleChangePlan = (nb: number) => {
    setPlanSelected(nb);
  };

  return (
    <div className="flex flex-col h-fit gap-32 mx-32 my-16 desktopSmall:gap-6">
      <h1 className="text-6xl text-center font-aldrich bg-gradient-to-r bg-clip-text text-transparent from-orange-800 via-orange-500 to-yellow-600 animate-premiumColorChanging">
        Premium access
      </h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl underline font-aldrich">
          Access the Code Editor for unlimited use
        </h2>
        <div className="flex justify-between ">
          <p className="w-4/5 text-lg font-barlow">
            Are you tired of hitting the daily code run limit on your free
            account? Upgrade to a premium account on Codeless 4 Editor and say
            goodbye to limitations! As a premium user, you&apos;ll have
            unlimited access to all the features and capabilities of the
            platform. This means you can experiment freely and create without
            constraints. Whether you&apos;re working on a large project or just
            testing out some new ideas, you&apos;ll never have to worry about
            reaching a daily limit again. With a premium account, you can focus
            on what truly matters - developing your projects to their full
            potential. Don&apos;t settle for a limited experience, upgrade to
            premium and take your coding to the next level with Codeless 4
            Editor.
          </p>
          <div className="flex justify-center items-center w-1/5">
            <Button gradientDuoTone="cyanToBlue">Run</Button>
            <img
              className="relative w-6 h-6 top-5 left-[-15px]"
              src="assets/infinity.png"
              alt="logo"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex justify-around items-center w-[15%]">
          <img className="w-8 h-8" src="assets/heart.png" alt="heart" />
          <img
            className="w-8 h-8"
            src="assets/speech-bubble.png"
            alt="speach"
          />
        </div>
        <div className="flex flex-col gap-4 w-4/5">
          <h2 className="text-3xl underline font-aldrich">
            Commentaries and likes unlimited
          </h2>
          <p className="text-lg font-barlow">
            Are you tired of being limited in your ability to show appreciation
            and offer feedback on other users&apos; projects on Codeless 4
            Editor? Upgrade to a premium account and take your interaction to
            the next level! With a premium account, you&apos;ll be able to like
            and comment on an unlimited number of projects, allowing you to
            fully engage with the Codeless 4 Editor community. Whether
            you&apos;re looking to share your expertise or simply show support
            for your fellow developers, a premium account gives you the freedom
            to do so without limitations. Don&apos;t miss out on the opportunity
            to connect and collaborate with other like-minded individuals,
            upgrade to premium today and take advantage of all that Codeless 4
            Editor has to offer.
          </p>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-4 w-3/5">
          <h2 className="text-3xl underline font-aldrich">
            Work with your team in the same time
          </h2>
          <p className="text-lg font-barlow">
            Are you tired of being the lone coder, toiling away in solitude?
            Upgrade to a premium account on Codeless 4 Editor and join the
            collaboration party! With premium, you can invite all your coding
            buddies to work on a project with you. It&apos;s like a virtual
            coding sleepover where you can share snacks, swap coding tricks, and
            stay up all night coding (or at least until someone&apos;s spouse
            calls). No more sending files back and forth and no more conflicting
            changes. It&apos;s like having a coding buddy who never forgets to
            save. Whether you&apos;re working on a group project for school, a
            startup or just need to get some work done with a friend, premium
            makes collaboration a breeze. So what are you waiting for? Upgrade
            to premium today and let the good times roll on Codeless 4 Editor.
          </p>
        </div>
        <div className="flex justify-around items-center w-2/5">
          <img className="" src="assets/groupeCode.png" alt="logo" />
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex justify-around items-center w-[15%]">
          <img className="w-12 h-12" src="assets/share.png" alt="logo" />
        </div>
        <div className="flex flex-col gap-4 w-4/5">
          <h2 className="text-3xl underline font-aldrich">
            Share your code with the community
          </h2>
          <p className="text-lg font-barlow">
            Ready to share your coding masterpieces with the world? Upgrade to a
            premium account on Codeless 4 Editor and unleash your code! With
            premium, you can share your projects with the community and show off
            your coding skills. Whether you&apos;re looking for feedback,
            inspiration, or just want to share your love of code, premium gives
            you the platform to do it. No more keeping your projects locked away
            on your hard drive. Share your code and connect with others who
            share your passion. And who knows, you may just inspire the next
            generation of coders! So what are you waiting for? Upgrade to
            premium today and join the code-sharing revolution on Codeless 4
            Editor.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <h2 className="text-3xl underline font-aldrich">Chose your plan</h2>
        <p className="">
          Interrested ? We suggest you 2 plans to join us as a premium
          codelesser:
        </p>
        <div className="flex justify-center items-center gap-10">
          <div
            role="presentation"
            onClick={() => {
              handleChangePlan(1);
            }}
            className={`p-4 w-48 h-32 border-2 rounded ${
              planSelected === 1 ? "border-blue-800" : "border-white"
            } flex flex-col items-center justify-center text-center cursor-pointer gap-2`}
          >
            <h3 className="underline font-medium">Monthly payment</h3>
            <p className="h-20">1$/month with 1st month for free</p>
          </div>
          <div
            role="presentation"
            onClick={() => {
              handleChangePlan(2);
            }}
            className={`p-4 w-48 h-32 border-2 rounded ${
              planSelected === 2 ? "border-blue-800" : "border-white"
            } flex flex-col items-center justify-center text-center cursor-pointer gap-2`}
          >
            <h3 className="underline font-medium">Lifetime access</h3>
            <p className="h-20">5$ that’s all.</p>
          </div>
        </div>
        <img className=" p-8 mx-auto w-1/3" src="assets/pay.png" alt="logo" />
      </div>
    </div>
  );
}

export default PremiumScreen;
