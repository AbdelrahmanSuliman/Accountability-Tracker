import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useCreateAddiction from "@/hooks/useCreateAddictions";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
//TODO: after creating addiction, return the invitation link
function Home() {
  {
    /*Add nav*/
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    console.log(name);

    createAddictionMutation.mutate(name, {
      onSuccess: (addiction) => {
        console.log("Created addiction:", addiction);
        console.log("Addiction ID:", addiction.id);
      },
    });
  };

  const createAddictionMutation = useCreateAddiction();
  return (
    <div className="min-h-screen w-screen">
      <h1 className="text-center p-8 text-4xl font-logo">Quittr</h1>
      <main className="flex flex-col lg:flex-row gap-6 px-12 min-h-screen">
        <div className="lg:w-1/3 flex flex-col gap-4">
          <div className="flex flex-row justify-between gap-2">
            <h2>Addictions</h2>
            <Dialog>
              <DialogTrigger render={<Button>Create Addiction</Button>} />
              <DialogContent>
                <form id="create-addiction-form" onSubmit={onSubmit}>
                  <DialogHeader>
                    <DialogTitle>Create Addiction</DialogTitle>

                    <DialogDescription>
                      Create an addiction to start tracking.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-2">
                    <label
                      htmlFor="addiction-name"
                      className="text-sm font-medium"
                    >
                      Name
                    </label>

                    <Input
                      id="addiction-name"
                      name="name"
                      placeholder="e.g. Social Media"
                    />
                  </div>

                  <DialogFooter className="mt-4">
                    <DialogClose
                      render={
                        <Button type="button" variant="outline">
                          Cancel
                        </Button>
                      }
                    />
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between">
              <span className="font-semibold">Your Addictions</span>
              <ChevronDown />
            </CollapsibleTrigger>{" "}
            <CollapsibleContent className="mt-2 space-y-2">
              <div>Smoking</div>
              <div>Gaming</div>
              <div>Social Media</div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Card className="lg:w-2/3">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>

          <CardContent>{/* Calendar + Journal */}</CardContent>
        </Card>
      </main>
    </div>
  );
}

export default Home;
