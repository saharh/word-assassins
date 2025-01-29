import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createGroup, joinGroup } from "./actions";

export default async function GroupsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Groups</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Join Group Card */}
        <Card>
          <CardHeader>
            <CardTitle>Join a Group</CardTitle>
            <CardDescription>
              Enter a group code to join an existing group
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={joinGroup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="joinCode">Group Code</Label>
                <Input
                  id="joinCode"
                  name="joinCode"
                  placeholder="Enter group code"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Join Group
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Create Group Card */}
        <Card>
          <CardHeader>
            <CardTitle>Create a Group</CardTitle>
            <CardDescription>
              Start a new group and invite others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createGroup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  name="groupName"
                  placeholder="Enter group name"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Group
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
