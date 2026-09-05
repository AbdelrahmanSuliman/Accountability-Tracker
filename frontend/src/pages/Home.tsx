import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useCreateAddiction from "@/hooks/useCreateAddictions";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

function Home() {
  {
    /*Add nav*/
  }
  const createAddictionMutation = useCreateAddiction();
  return (
    <div className="min-h-screen w-screen">
      <h1 className="text-center p-8 text-4xl font-logo">Quittr</h1>
      <main className="flex flex-col lg:flex-row gap-6 px-12 min-h-screen">
        <div className="lg:w-1/3 flex flex-col">
          <div className="flex flex-row justify-between gap-2">
            <h2>Addictions</h2>
            <Button variant="default">Create Addiction</Button>
          </div>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between">
              <span className="font-semibold">Your Addictions</span>
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
