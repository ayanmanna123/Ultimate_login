import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function CreateAccount() {
  return (
    <div className="absolute inset-0 flex items-center justify-center min-h-screen bg-black text-white">
      <Card className="w-[350px] bg-neutral-900 border-neutral-800 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700"
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700"
            >
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button>
          </div>

          <div className="relative">
            <Separator className="bg-neutral-700" />
            <span className="absolute inset-0 flex justify-center items-center text-xs text-neutral-400">
              <span className="px-2 bg-neutral-900">OR CONTINUE WITH</span>
            </span>
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="email" className="text-sm font-medium ">
              Full Name
            </label>
            <Input
              id="name"
              type="name"
              placeholder="your name"
              className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
            />
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="email" className="text-sm font-medium ">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
            />
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label>Profile:</Label>
            <input accept="image/*" type="file" className="cursor-pointer border-b-white" />
          </div>

          <Button className="w-full bg-neutral-200 text-black hover:bg-neutral-300">
            Create account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
