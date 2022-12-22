// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function HomeScreen() {
  // const token = localStorage.getItem("token");

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (token === null) {
  //     navigate("/login");
  //   }
  // });

  return (
    <section className="flex flex-col desktopSmall:gap-6">
      <h1 className="mt-8 text-center text-4xl ">Welcome to</h1>
      <div className="flex items-center justify-center">
        <img
          className="w-40 h-30 content-center"
          src="assets/logo.png"
          alt="logo"
        />
      </div>

      <div className="flex justify-around mt-16">
        <div>
          <h2 className="text-3xl underline">CODELESS 4 Code Editor</h2>
          <p className="mt-4">
            Simple project to sort winners from a list of multiple candidates.
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, <br /> dignissim sit amet,
            adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
          </p>
        </div>
        <div className="w-1/3">
          <img
            className="content-center"
            src="assets/editorScreen.png"
            alt="logo"
          />
        </div>
      </div>

      <hr className="my-14 w-1/2 mx-auto h-1 bg-gray-100 rounded border-0" />

      <div className="flex justify-around">
        <div className="w-1/3">
          <img
            className="content-center"
            src="assets/sharePage.png"
            alt="logo"
          />
        </div>
        <div>
          <h2 className="text-3xl underline">CODELESS 4 Best Shares</h2>
          <p className="mt-4">
            Simple project to sort winners from a list of multiple candidates.
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, <br /> dignissim sit amet,
            adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
          </p>
        </div>
      </div>

      <hr className="my-14 w-1/2 mx-auto h-1 bg-gray-100 rounded border-0" />
      <h2 className="text-3xl text-center underline">You said less ?</h2>

      <div className="grid grid-cols-2">
        <div className="">
          <h3 className="text-2xl text-green-700 text-center">Free account</h3>
          <div className="flex flex-col items-center">
            <div className="mx-6">
              <li>Access to the Code Editor (50 running a day)</li>
              <li>You can give 5 likes and 3 commentaries a month </li>
              <li>You can contact us </li>
              <li>You can subscribe a premium account</li>
            </div>
          </div>
        </div>
        <hr className="mt-8 absolute left-1/2 -ml-0.5 w-0.5 h-32 bg-gray-100 rounded border-0" />
        <div className="">
          <h3 className="text-2xl text-amber-800 text-center">
            Premium account
          </h3>
          <div className="flex flex-col items-center">
            <div className="mx-6">
              <li>Access to the Code Editor for unlimited use</li>
              <li>
                Commentaries and likes unlimited Work with your team in the same
                time
              </li>
              <li>
                Share your code for the community Follow codelessers and be
                alerted
              </li>
              <li>
                when they post Earn money, lots of money, because time is money,
                <br />
                you will earn time by coding less with codeless.
              </li>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mx-auto mt-8 w-1/5 text-xl bg-[#15202f] rounded-lg px-5 py-2.5 mb-4"
      >
        GET YOUR PREMIUM ACCES NOW !
      </button>
    </section>
  );
}

export default HomeScreen;
