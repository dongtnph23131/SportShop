import LayoutAdmin from "@/components/layouts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import { ProfileForm } from "@/components/profile-form";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileQuery } from "@/services/profile/profile-query";
import BannerManagement from "@/components/banner-management";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: currentUser } = useProfileQuery();

  return (
    <>
      <Card className="mt-2 max-w-2xl">
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>Manage your profile</CardDescription>
        </CardHeader>

        <CardContent>
          <Separator className="mt-4 mb-8" />
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentUser?.avatar} alt="Avatar" />
                <AvatarFallback>{currentUser?.firstName}</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-medium">
                  {currentUser?.firstName + " " + currentUser?.lastName}
                </h3>
                <p className="text-gray-800 text-sm">{currentUser?.email}</p>
              </div>
            </div>

            <ProfileForm />
          </div>
        </CardContent>
      </Card>

      <BannerManagement />
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
