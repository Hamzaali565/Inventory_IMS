import HeaderPart from "./HeaderPart";

const menuConfig = [
  {
    trigger: "Inventory",
    items: [
      { label: "Unit" },
      { label: "Create Item" },
      { label: "Physical Stock Taking" },
      { label: "Good Receipt Note" },

      {
        label: "Reports",
        subItems: [{ label: "List of Items" }, { label: "List of GRNs" }],
      },
    ],
  },
  {
    trigger: "Sales",
    items: [
      { label: "Create Shift" },
      { label: "Close Shift" },
      { label: "Create Sales Order" },
      { label: "Pending Bills" },
      { label: "Re-Print Bill" },
      {
        label: "Reports",
        subItems: [
          { label: "List of Bills" },
          { label: "Date Wise Profit" },
          { label: "Cash Status" },
          { label: "Shift Status" },
        ],
      },
    ],
  },
  {
    trigger: "Purchase Order",
    items: [
      { label: "Create Purchase Order" },
      {
        label: "Reports",
        subItems: [{ label: "List Of Purchase Order" }],
      },
    ],
  },
  {
    trigger: "Supplier",
    items: [
      { label: "Add Supplier" },
      { label: "Payments" },
      {
        label: "Reports",
        subItems: [{ label: "List Of Supplier" }],
      },
    ],
  },

  //   {
  //     trigger: "Purchase Order",
  //     items: [
  //       { label: "Purchase Order" },
  //       { label: "Always Show Full URLs", checked: true },
  //       { separator: true },
  //       { label: "Reload", shortcut: "⌘R", inset: true },
  //       { label: "Force Reload", shortcut: "⇧⌘R", disabled: true, inset: true },
  //       { separator: true },
  //       { label: "Toggle Fullscreen", inset: true },
  //       { separator: true },
  //       { label: "Hide Sidebar", inset: true },
  //     ],
  //   },
  //   {
  //     trigger: "Profiles",
  //     items: [
  //       {
  //         label: "benoit",
  //         subItems: [
  //           { label: "Andy", value: "andy" },
  //           { label: "Benoit", value: "benoit" },
  //           { label: "Luis", value: "luis" },
  //         ],
  //       },
  //       { separator: true },
  //       { label: "Edit...", inset: true },
  //       { separator: true },
  //       { label: "Add Profile...", inset: true },
  //     ],
  //   },
];
const App = () => {
  return (
    <div className="">
      <HeaderPart menus={menuConfig} />
    </div>
  );
};

export default App;
