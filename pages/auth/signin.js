import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

function signin({ providers }) {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center mt-32 bg-black">
        <img src="https://links.papareact.com/ocw " alt="instagram" className="w-80 bg-[#ffffffe3] rounded-3xl mb-8 border shadow-lg shadow-white " />
        <p className="font-md italic font-semibold">To get access to site .., Please sign in first 💙</p>
        <section className="mt-14">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="px-5 py-3 rounded-xl text-white bg-blue-600  cursor-pointer" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signin;
