import React from "react";

function PremiumScreen() {
  return (
    <div className="flex flex-col desktopSmall:gap-6">
      <h1 className="mt-4 text-4xl text-center  bg-gradient-to-r bg-clip-text text-transparent from-orange-800 via-orange-500 to-yellow-600 animate-premiumColorChanging">
        Premium access
      </h1>
      <div className="gap-6 flex justify-center items-center mt-16">
        <div className=" w-1/2">
          <h2 className="text-2xl underline">
            Access the Code Editor for unlimited use
          </h2>
          <p className="mt-4">
            With the free account, you can run your code only 50 times a day.
            It’s ancient history with premium account, you’ll be able to run
            your code as much as you like.
          </p>
        </div>
        <div className="w-1/5">
          <img
            className=" mx-4 w-30 h-20"
            src="assets/infinity.png"
            alt="logo"
          />
        </div>
      </div>
      <div className="gap-6 flex justify-center items-center mt-16">
        <div className="w-1/5 flex justify-around">
          <img className=" mx-4 w-15 h-10" src="assets/heart.png" alt="logo" />
          <img
            className=" mx-4 w-15 h-10"
            src="assets/speech-bubble.png"
            alt="logo"
          />
        </div>
        <div className=" w-1/2">
          <h2 className="text-2xl underline">
            Commentaries and likes unlimited
          </h2>
          <p className="mt-4">
            Support everything as many times as you want, whenever you want and
            from wherever you want. Make the community’s code great again ! Ask
            the creator questions, suggest improvements, or just commend him for
            the beauty of his code. Any project you interract with will be
            visible in your user space.
          </p>
        </div>
      </div>
      <div className="gap-6 flex justify-center mt-16">
        <div className=" w-1/2">
          <h2 className="text-2xl underline">
            Work with your team in the same time
          </h2>
          <p className="mt-4">
            Have you ever been blocked when you code ? Don’t answer that, it was
            just a rethorical question... This time is finish, with premium
            account, you can share a link to your favorites
            helpers/friends/colleagues to help you to find where the hell’s the
            forgotten bracket or why array.map(‘...’) is not a function. Develop
            the best code with your best team !
          </p>
        </div>
        <img className=" mx-4 w-1/5" src="assets/groupeCode.png" alt="logo" />
      </div>
      <div className="gap-6 flex justify-center items-center mt-16">
        <div className="w-1/5">
          <img className=" mx-8 w-30 h-20" src="assets/share.png" alt="logo" />
        </div>
        <div className=" w-1/2">
          <h2 className="text-2xl underline">
            Access the Code Editor for unlimited use
          </h2>
          <p className="mt-4">
            With the free account, you can run your code only 50 times a day.
            It’s ancient history with premium account, you’ll be able to run
            your code as much as you like.
          </p>
        </div>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl underline">Chose your plan</h2>
        <p className="mt-4">
          We suggest you 2 plans to join us as a premium codelesser:
        </p>
      </div>

      <div className="gap-6 flex justify-center items-center mt-8">
        <div className="p-4 w-48 h-32 border-2 rounded border-white text-center">
          <h3>Monthly payment</h3>
          <p>1$/month with 1st month for free</p>
          <label htmlFor="html">
            <input type="radio" id="html" name="fav_language" value="HTML" />
          </label>
        </div>
        <div className="p-4 w-48 h-32 border-2 rounded border-white text-center">
          <h3>Lifetime access</h3>
          <p>5$ that’s all</p>
          <label htmlFor="html">
            <input type="radio" id="html" name="fav_language" value="HTML" />
          </label>
        </div>
      </div>

      <img className=" p-8 mx-auto w-1/3" src="assets/pay.png" alt="logo" />
    </div>
  );
}

export default PremiumScreen;
