import ProfilePage from "@/components/templates/ProfilePage";
import { getToken } from "next-auth/jwt";

const Profile = () => {
  return <ProfilePage />;
};

export default Profile;

export async function getServerSideProps({ req }) {
  const token = await getToken({ req });

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
