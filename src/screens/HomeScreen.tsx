import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";

function HomeScreen() {
  return (
    <section className="flex flex-col h-fit gap-32 mx-32 my-16 desktopSmall:gap-6">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <h1 className="text-center text-6xl font-aldrich">Welcome to</h1>
        <img
          className="w-40 h-30 animate-shaking"
          src="assets/logo.png"
          alt="logo"
        />
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col gap-4 w-1/2">
          <h2 className="text-4xl underline font-aldrich ">
            CODELESS 4 Code Editor
          </h2>
          <p className="text-lg font-barlow">
            The Codeless 4 Editor is an innovative online code editor that
            offers a smooth and intuitive development experience. With its
            user-friendly interface, you can quickly create complex projects and
            compile them in just a few seconds. This tool offers great
            flexibility and allows you to work on your projects from anywhere,
            anytime. The support for many programming languages and advanced
            features such as auto-correction and syntax highlighting make the
            Codeless 4 Editor a perfect choice for both novice and experienced
            developers. If you&apos;re looking to improve your productivity and
            simplify your development process, the Codeless 4 Editor is the
            ideal solution for you.
          </p>
        </div>
        <img
          className="w-2/5 object-contain"
          src="/assets/editorScreen.png"
          alt="imgEditor"
        />
      </div>

      <div className="flex justify-between">
        <img
          className="w-2/5 object-contain"
          src="assets/sharePage.png"
          alt="imgEditor"
        />
        <div className="flex flex-col gap-4 w-1/2">
          <h2 className="text-4xl underline font-aldrich ">
            CODELESS 4 Best Shares
          </h2>
          <p className="text-lg font-barlow">
            The Codeless 4 Editor also features a &quot;Best Shares&quot;
            section, which showcases the top projects shared by the community.
            This section is a great way to get inspiration, learn new techniques
            and stay up-to-date with the latest trends in your field. By
            browsing the &quot;Best Shares&quot; section, you can discover
            innovative solutions, explore different approaches and expand your
            knowledge. Whether you&apos;re a seasoned developer or just starting
            out, the &quot;Best Shares&quot; section is a valuable resource that
            can help you take your skills to the next level. So why wait? Join
            the Codeless 4 Editor community today and start sharing your
            projects with the world.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full gap-8 pb-12">
        <h2 className="text-4xl text-center underline font-aldrich">
          You said less ?
        </h2>
        <div className="flex justify-between w-2/3 font-barlow">
          <div className="w-2/5 flex flex-col gap-4">
            <h3 className="text-2xl text-lime-700 font-semibold text-center">
              Free account
            </h3>
            <ul className="flex flex-col justify-center items-center text-center text-lg">
              <li>Access to the Code Editor (50 running a day)</li>
              <li>You can give 5 likes and 3 commentaries a month </li>
              <li>You can contact us </li>
              <li>You can subscribe a premium account</li>
            </ul>
          </div>
          <div className="h-full border-2 border-white w-1">&nbsp;</div>
          <div className="w-2/5 flex flex-col gap-4">
            <h3 className="text-2xl bg-gradient-to-r bg-clip-text text-transparent from-orange-800 via-orange-500 to-yellow-600 animate-premiumColorChanging text-center font-semibold">
              Premium account
            </h3>
            <ul className="flex flex-col justify-center items-center text-center text-lg">
              <li>Access to the Code Editor for unlimited use</li>
              <li>Commentaries and likes unlimited</li>
              <li>Work with your team in the same time</li>
              <li>Share your code for the community</li>
              <li>Follow codelessers and be alerted when they post</li>
              <li>
                Earn money, lots of money, because time is money, you will earn
                time by coding less with codeless
              </li>
            </ul>
          </div>
        </div>
        <NavLink className="mx-auto mt-8 w-1/5" to="/premium">
          <Button
            type="submit"
            gradientDuoTone="pinkToOrange"
            className="m-auto"
          >
            GET YOUR PREMIUM ACCESS NOW
          </Button>
        </NavLink>
      </div>
    </section>
  );
}

export default HomeScreen;
