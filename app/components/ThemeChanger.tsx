import { Moon, Sun } from "lucide-react";
import { Form } from "react-router";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTranslation } from "~/hooks/useTranslation";
import { useRootLoaderData } from "~/root";

export default function ThemeChanger() {
  const { currentTheme } = useRootLoaderData();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="px-2">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t.theme.toggle}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Form action="/theme" method="post">
          <button className="contents" type="submit" name="theme" value="light">
            <DropdownMenuCheckboxItem checked={currentTheme === "light"}>
              {t.theme.light}
            </DropdownMenuCheckboxItem>
          </button>
          <button className="contents" type="submit" name="theme" value="dark">
            <DropdownMenuCheckboxItem checked={currentTheme === "dark"}>
              {t.theme.dark}
            </DropdownMenuCheckboxItem>
          </button>
          <button
            className="contents"
            type="submit"
            name="theme"
            value="system"
          >
            <DropdownMenuCheckboxItem checked={currentTheme === "system"}>
              {t.theme.system}
            </DropdownMenuCheckboxItem>
          </button>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
