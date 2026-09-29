"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sun, Moon, Monitor, Palette } from "lucide-react";

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else if (theme === "light") root.classList.remove("dark");
    else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, [theme]);

  const themeOptions = [
    { value: "dark", label: "Dark", icon: Moon, description: "Always use dark mode" },
    { value: "light", label: "Light", icon: Sun, description: "Always use light mode" },
    { value: "system", label: "System", icon: Monitor, description: "Match your system setting" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Appearance</h1>
        <p className="text-muted-text">Customize how Trackly looks on your device.</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Theme</h2>
        <div className="space-y-3">
          <RadioGroup value={theme} onValueChange={setTheme}>
            {themeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-4 p-4 bg-secondary-card rounded-lg">
                <RadioGroupItem value={option.value} className="mt-0.5" />
                <div className="flex items-center space-x-3 flex-1">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <option.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text">{option.label}</p>
                    <p className="text-sm text-muted-text">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Density</h2>
        <div className="space-y-3">
          <RadioGroup value="comfortable" onValueChange={() => {}}>
            <div className="flex items-center space-x-4 p-4 bg-secondary-card rounded-lg">
              <RadioGroupItem value="compact" className="mt-0.5" />
              <div className="flex items-center space-x-3 flex-1">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text">Compact</p>
                  <p className="text-sm text-muted-text">Smaller spacing and text</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-secondary-card rounded-lg">
              <RadioGroupItem value="comfortable" className="mt-0.5" />
              <div className="flex items-center space-x-3 flex-1">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text">Comfortable</p>
                  <p className="text-sm text-muted-text">Default spacing and text</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-secondary-card rounded-lg">
              <RadioGroupItem value="spacious" className="mt-0.5" />
              <div className="flex items-center space-x-3 flex-1">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text">Spacious</p>
                  <p className="text-sm text-muted-text">Larger spacing and text</p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      </Card>
    </div>
  );
}
