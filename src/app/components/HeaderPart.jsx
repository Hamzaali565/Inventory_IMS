"use client";

import React from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"; // Adjust the import path as needed

const SubHeader = ({ menus }) => {
  const renderMenuItems = (items) => {
    return items.map((item, index) => {
      if (item.separator) {
        return <MenubarSeparator key={index} className="my-2" />;
      }

      if (item.radioGroup && item.subItems) {
        return (
          <MenubarRadioGroup key={index} value={item.value}>
            {item.subItems.map((radioItem, radioIndex) => (
              <MenubarRadioItem
                key={radioIndex}
                value={radioItem.value ?? "default"}
                className="hover:bg-gray-100 p-2 rounded-md transition"
              >
                {radioItem.label}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
        );
      }

      if (item.subItems) {
        return (
          <MenubarSub key={index}>
            <MenubarSubTrigger className="hover:bg-gray-200 p-2 rounded-md transition">
              {item.label}
            </MenubarSubTrigger>
            <MenubarSubContent className="space-y-1 p-2 rounded-md shadow-lg">
              {renderMenuItems(item.subItems)}
            </MenubarSubContent>
          </MenubarSub>
        );
      }

      if (item.checked !== undefined) {
        return (
          <MenubarCheckboxItem
            key={index}
            checked={item.checked}
            disabled={item.disabled}
            className="hover:bg-gray-100 p-2 rounded-md transition"
          >
            {item.label}
          </MenubarCheckboxItem>
        );
      }

      return (
        <MenubarItem
          key={index}
          disabled={item.disabled}
          inset={item.inset}
          className={`hover:bg-gray-400 p-2 rounded-md transition ${
            item.disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {item.label}
          {item.shortcut && (
            <MenubarShortcut className="text-gray-500">
              {item.shortcut}
            </MenubarShortcut>
          )}
        </MenubarItem>
      );
    });
  };

  return (
    <Menubar className="bg-white/90 backdrop-blur-lg rounded-lg shadow-md border border-gray-200">
      {menus.map((menu, menuIndex) => (
        <MenubarMenu key={menuIndex}>
          <MenubarTrigger className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 rounded-md transition">
            {menu.trigger}
          </MenubarTrigger>
          <MenubarContent className="mt-2 rounded-md shadow-lg p-2">
            {renderMenuItems(menu.items)}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default SubHeader;
