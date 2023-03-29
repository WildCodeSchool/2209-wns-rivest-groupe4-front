import { gql, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button } from "flowbite-react";

type FormValues = {
  name: string;
  email: string;
  reason: string;
};

const SEND_MAIL = gql`
  query Query($name: String!, $email: String!, $reason: String!) {
    SendMail(name: $name, email: $email, reason: $reason)
  }
`;

function ContactScreen() {
  document.title = "Codeless4 | Contact";

  const [mail] = useLazyQuery(SEND_MAIL, {
    onCompleted(data: { SendMail: FormValues }) {
      console.warn(data);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => {
    mail({
      variables: data,
    });
    reset();
  });

  return (
    <section className="h-screen flex items-center justify-center text-center  ">
      <div className=" bg-[#283544] w-2/3 h-5/6 rounded-md mobileLarge:w-5/6 mobileSmall:w-5/6 ">
        <h1 className="text-center text-6xl font-aldrich mt-4 mobileLarge:text-xl mobileSmall:text-xl">
          Contact us
        </h1>
        <form onSubmit={onSubmit}>
          <div>
            <h2 className="text-2xl font-aldrich mt-4 mobileLarge:text-lg mobileSmall:text-lg">
              Name
            </h2>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-1/2 h-10 mt-2 rounded text-black text-center font-bold phablet:w-5/6 tablet:w-5/6 mobileLarge:w-5/6 mobileSmall:w-5/6 "
              {...register("name", { required: true })}
            />
            {/* Si le champ n'est pas rempli, on indique à l'utilisateur que ce champ est requis. */}
            {errors?.name && (
              <p className="text-red-600 mt-1">Name is required</p>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-aldrich mt-4 mobileLarge:text-lg mobileSmall:text-lg">
              Mail
            </h2>
            <input
              type="email"
              placeholder="Enter your mail"
              className="w-1/2 h-10 mt-2 rounded text-black text-center font-bold phablet:w-5/6 tablet:w-5/6 mobileLarge:w-5/6 mobileSmall:w-5/6"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600 mt-1">Email is required</p>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-aldrich mt-4 mobileLarge:text-lg mobileSmall:text-lg">
              Reason
            </h2>
            <textarea
              placeholder="Explain your problem"
              className="w-1/2 h-40 mt-2 rounded text-black font-bold phablet:w-5/6 tablet:w-5/6 mobileLarge:w-5/6 mobileSmall:w-5/6 mobileSmall:h-3/4 "
              {...register("reason", { required: true })}
            />
            {errors.reason?.type === "required" && (
              <p className="text-red-600 mt-1">Reason is required</p>
            )}
            <div className="flex justify-center mt-4">
              <Button type="submit" value="send">
                SEND
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactScreen;
