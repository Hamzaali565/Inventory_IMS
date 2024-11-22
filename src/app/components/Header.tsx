import HeaderPart from "./HeaderPart";

const menuConfig = [
  {
    trigger: "File",
    items: [
      { label: "New Tab", shortcut: "⌘T" },
      { label: "New Window", shortcut: "⌘N" },
      { label: "New Incognito Window", disabled: true },
      { separator: true },
      {
        label: "Share",
        subItems: [
          { label: "Email link" },
          { label: "Messages" },
          { label: "Notes" },
        ],
      },
      { separator: true },
      { label: "Print", shortcut: "⌘P" },
    ],
  },
  {
    trigger: "Edit",
    items: [
      { label: "Undo", shortcut: "⌘Z" },
      { label: "Redo", shortcut: "⇧⌘Z" },
      { separator: true },
      {
        label: "Find",
        subItems: [
          { label: "Search the web" },
          { separator: true },
          { label: "Find..." },
          { label: "Find Next" },
          { label: "Find Previous" },
        ],
      },
      { separator: true },
      { label: "Cut" },
      { label: "Copy" },
      { label: "Paste" },
    ],
  },
  {
    trigger: "View",
    items: [
      { label: "Always Show Bookmarks Bar", checked: false },
      { label: "Always Show Full URLs", checked: true },
      { separator: true },
      { label: "Reload", shortcut: "⌘R", inset: true },
      { label: "Force Reload", shortcut: "⇧⌘R", disabled: true, inset: true },
      { separator: true },
      { label: "Toggle Fullscreen", inset: true },
      { separator: true },
      { label: "Hide Sidebar", inset: true },
    ],
  },
  {
    trigger: "Profiles",
    items: [
      {
        radioGroup: true,
        value: "benoit",
        subItems: [
          { label: "Andy", value: "andy" },
          { label: "Benoit", value: "benoit" },
          { label: "Luis", value: "luis" },
        ],
      },
      { separator: true },
      { label: "Edit...", inset: true },
      { separator: true },
      { label: "Add Profile...", inset: true },
    ],
  },
];
const App = () => {
  return (
    <div>
      <HeaderPart menus={menuConfig} />
    </div>
  );
};

export default App;
