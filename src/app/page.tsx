import CredentialsInput from "./login/components/CredentialsInput";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-black shadow-xl rounded-2xl p-8 w-">
        <div className="flex flex-col gap-4 items-center">
          <CredentialsInput />
        </div>
      </div>
    </div>
  );
}
