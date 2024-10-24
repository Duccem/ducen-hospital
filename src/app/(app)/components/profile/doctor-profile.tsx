import { Avatar, AvatarImage } from '@/libs/shadcn-ui/components/avatar';
import { Badge } from '@/libs/shadcn-ui/components/badge';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { Icons } from '@/libs/shadcn-ui/components/icons';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/libs/shadcn-ui/components/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/libs/shadcn-ui/components/tooltip';
import { User } from '@clerk/nextjs/server';
import {
  BadgeCheck,
  BellRing,
  BookA,
  FilePenIcon,
  Globe,
  KeyRound,
  Layers2,
  Mail,
  MapPin,
  Phone,
  PlusCircle,
  ShieldPlus,
  Trash,
  Wrench
} from 'lucide-react';

const DoctorProfile = ({ user }: { user: User }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] h-full py-6 gap-8 mx-10">
      <Card className="bg-foreground shadow-none border-none">
        <CardContent className="py-5 flex flex-col items-center gap-4">
          <div className="flex justify-between items-center gap-2">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.imageUrl} className="object-contain" />
            </Avatar>
            <div className="text-background">
              <h1 className="text-2xl font-bold">Dr. {user.fullName}</h1>
              <p>Cardiologist</p>
            </div>
            <Button variant="ghost" className="text-background gap-2">
              <FilePenIcon className="w-4 h-4 "> </FilePenIcon>
            </Button>
          </div>
          <div className="bg-muted-foreground w-full h-[2px] mt-2"></div>
          <div className="flex flex-col items-start gap-2 mt-4 w-full">
            <p className="text-sm text-muted-foreground text-start">About</p>
            <p className="text-background">
              {user.publicMetadata?.biography as string}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 mt-4 w-full">
            <p className="text-sm text-muted-foreground text-start">Contact</p>
            <p className="text-background flex justify-start items-center gap-2">
              <Mail className="w-5 h-5 text-muted-foreground" />
              {user.primaryEmailAddress.emailAddress}
            </p>
            <p className="text-background flex justify-start items-center gap-2">
              <Phone className="w-5 h-5 text-muted-foreground" />
              {user.primaryPhoneNumber?.phoneNumber || 'No phone number'}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 mt-4 w-full">
            <p className="text-sm text-muted-foreground text-start">Social</p>
            <p className="text-background flex justify-start items-center gap-2">
              <Icons.facebook
                color="#fff"
                className="h-5 w-5 cursor-pointer"
              ></Icons.facebook>
              <Icons.instagram
                color="#fff"
                className="h-5 w-5 cursor-pointer"
              ></Icons.instagram>
              <Icons.twitter
                color="#fff"
                className="h-5 w-5 cursor-pointer"
              ></Icons.twitter>
              <Icons.likedin
                color="#fff"
                className="h-5 w-5 cursor-pointer"
              ></Icons.likedin>
              <Globe className="h-5 w-5 text-background cursor-pointer"></Globe>
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-8 max-h-svh overflow-scroll no-scroll">
        <div className="shadow-none border-none p-5">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold">Professional information</p>
              <Button variant="outline" className="gap-2 w-min">
                <FilePenIcon className="w-4 h-4 "> </FilePenIcon>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-1 mt-4 w-full">
              <div className="flex gap-2 items-center">
                <p className="text-sm font-semibold text-foreground text-start">
                  Medical License
                </p>
                <ShieldPlus className="h-4 w-4"></ShieldPlus>
              </div>
              <p className="italic text-muted-foreground text-xs">
                Recuerda que para poder prestar servicios dentro de Helsa, es
                necesario que su licencia médica esté verificada.
              </p>
              <div className="flex items-center gap-2">
                <p className="text-sm">ABC123456</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <BadgeCheck
                        className="h-5 w-5 text-color-complementary-success cursor-pointer"
                        role="button"
                      ></BadgeCheck>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verify</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="flex justify-start gap-5">
              <div className="flex flex-col items-start gap-2 mt-4">
                <div className="flex gap-2 items-center w-full">
                  <p className="text-sm font-semibold text-foreground text-start">
                    Specialty
                  </p>

                  <Layers2 className="h-4 w-4"></Layers2>
                </div>
                <div className="flex gap-2">
                  <Badge variant="default" className="rounded-sm">
                    Cardiology
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 mt-4 w-full">
                <div className="flex gap-2 items-center w-full">
                  <p className="text-sm font-semibold text-foreground text-start flex justify-start gap-2 items-center">
                    Sub Specialties
                    <Layers2 className="w-4 h-4" />
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="rounded-sm">
                    Surgery
                  </Badge>
                  <Badge variant="outline" className="rounded-sm">
                    Primary attention
                  </Badge>
                  <Badge variant="outline" className="rounded-sm">
                    Cardiology
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 mt-4 w-full">
              <div className="flex gap-2 items-center w-full">
                <p className="text-sm font-semibold text-foreground text-start">
                  Languages
                </p>

                <BookA className="h-4 w-4"></BookA>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="rounded-sm">
                  Spanish
                </Badge>
                <Badge variant="outline" className="rounded-sm">
                  English
                </Badge>
                <Badge variant="outline" className="rounded-sm">
                  Portuguese
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 mt-4 w-full">
              <div className="flex gap-2 items-center w-full">
                <p className="text-sm font-semibold text-foreground text-start">
                  Consulting room address
                </p>

                <MapPin className="h-4 w-4"></MapPin>
              </div>
              <p className="text-sm">123 Main Street, Anytown USA 12345</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <Tabs defaultValue="experience">
            <TabsList className="p-0 bg-transparent gap-2">
              <TabsTrigger
                value="experience"
                className="justify-start px-1 m-0 bg-transparent data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-color-brand-secondary data-[state=active]:border-primary rounded-none"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="justify-start px-1 m-0 bg-transparent data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-color-brand-secondary data-[state=active]:border-primary rounded-none"
              >
                Education
              </TabsTrigger>
            </TabsList>
            <TabsContent value="education">
              <div className="flex flex-col items-start gap-2 mt-4">
                <div className="flex gap-2 items-center">
                  <p className="text-sm font-semibold text-foreground text-start">
                    Education
                  </p>

                  <Button variant="ghost" className="gap-2">
                    <PlusCircle className="w-4 h-4 "> </PlusCircle>
                  </Button>
                </div>
                <div className="flex flex-col gap-6 w-full">
                  <div className="border-b-2 border-primary rounded-none justify-between items-center gap-3  flex">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">Medical Degree, 2007</p>
                      <p className="text-xs italic text-muted-foreground">
                        Harvard Medical School
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <FilePenIcon className="w-4 h-4"> </FilePenIcon>
                      </Button>
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <Trash className="w-4 h-4"></Trash>
                      </Button>
                    </div>
                  </div>
                  <div className="border-b-2 border-color-complementary-warning rounded-none justify-between items-center gap-3  flex">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">Residency, 2011</p>
                      <p className="text-xs italic text-muted-foreground">
                        Massachusetts General Hospital
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <FilePenIcon className="w-4 h-4"> </FilePenIcon>
                      </Button>
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <Trash className="w-4 h-4"></Trash>
                      </Button>
                    </div>
                  </div>
                  <div className="border-b-2 border-color-complementary-success rounded-none justify-between items-center gap-3  flex">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">Fellowship, 2013</p>
                      <p className="text-xs italic text-muted-foreground">
                        Cleveland Clinic
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <FilePenIcon className="w-4 h-4"> </FilePenIcon>
                      </Button>
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <Trash className="w-4 h-4"></Trash>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="experience">
              <div className="flex flex-col items-start gap-2 mt-4">
                <div className="flex gap-2 items-center">
                  <p className="text-sm font-semibold text-foreground text-start">
                    Experience
                  </p>

                  <Button variant="ghost" className="gap-2">
                    <PlusCircle className="w-4 h-4 "> </PlusCircle>
                  </Button>
                </div>
                <div className="flex flex-col gap-6 w-full">
                  <div className="border-b-2 border-primary rounded-none justify-between items-center gap-3  flex">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">Internship, 2007-2011</p>
                      <p className="text-xs italic text-muted-foreground">
                        Massachusetts General Hospital
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <FilePenIcon className="w-4 h-4"> </FilePenIcon>
                      </Button>
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <Trash className="w-4 h-4"></Trash>
                      </Button>
                    </div>
                  </div>
                  <div className="border-b-2 border-primary rounded-none justify-between items-center gap-3  flex">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">Cardiologist, 2011-2016</p>
                      <p className="text-xs italic text-muted-foreground">
                        Acme Medical Center
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <FilePenIcon className="w-4 h-4"> </FilePenIcon>
                      </Button>
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <Trash className="w-4 h-4"></Trash>
                      </Button>
                    </div>
                  </div>
                  <div className="border-b-2 border-primary rounded-none justify-between items-center gap-3  flex">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">
                        Chief of Cardiology, 2016-present
                      </p>
                      <p className="text-xs italic text-muted-foreground">
                        Anytown Hospital
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <FilePenIcon className="w-4 h-4"> </FilePenIcon>
                      </Button>
                      <Button
                        className="w-8 h-8 p-1"
                        variant="ghost"
                      >
                        <Trash className="w-4 h-4"></Trash>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center gap-2">
              <p className="text-2xl font-semibold">Configuration</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-5 flex flex-col items-start gap-4">
          <Button variant='ghost' className='gap-2 items-center'>Cambiar contraseña <KeyRound className='h-4 w-4'></KeyRound> </Button>
          <Button variant='ghost' className='gap-2'>Gestionar notificaciones <BellRing className='h-4 w-4'></BellRing></Button>
          <Button variant='ghost' className='gap-2'>Gestionar cuenta <Wrench className='h-4 w-4'></Wrench></Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;
