"use client";
import HeaderPart from "./HeaderPart";

const menuConfig = [
  {
    trigger: "Inventory",
    items: [
      { label: "Unit", route: "/screens/Inventory/Unit" },
      { label: "Category", route: "/screens/Inventory/Category" },
      { label: "Location", route: "/screens/Inventory/Location" },
      { label: "Create Item", route: "/screens/Inventory/Item" },
      { label: "Physical Stock Taking", route: "/screens/Inventory/Stock" },
      { label: "Good Receipt Note", route: "/screens/Inventory/GRN" },
      {
        label: "Direct Good Receipt Note",
        route: "/screens/Inventory/Direct-GRN",
      },
      {
        label: "Local Purchase Adjustment",
        route: "/screens/Inventory/LPAdjustment",
      },

      {
        label: "Reports",
        subItems: [
          {
            label: "Current Stock Ledger",
            route: "/screens/Inventory/C-Stock",
          },
          {
            label: "Pervoius Stock Ledger",
            route: "/screens/Inventory/P-Stock",
          },
          { label: "List of Items" },
          { label: "List of GRNs" },
        ],
      },
    ],
  },
  {
    trigger: "Sales",
    items: [
      { label: "Create Shift" },
      { label: "Close Shift" },
      { label: "Create Sales Order", route: "/screens/Sales/SaleOrder" },
      { label: "Sale Return", route: "/screens/Sales/SaleReturn" },
      {
        label: "Receive Credit Amount",
        route: "/screens/Sales/ReceiveCreditAmount",
      },
      { label: "Pending Bills" },
      { label: "Re-Print Bill" },
      {
        label: "Reports",
        subItems: [
          { label: "Credit Customers", route: "/screens/Sales/CreditCustomer" },
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
      { label: "Create Purchase Order", route: "/screens/PurOrder" },
      {
        label: "Reports",
        subItems: [{ label: "List Of Purchase Order" }],
      },
    ],
  },
  {
    trigger: "Supplier",
    items: [
      { label: "Add Supplier", route: "/screens/Supplier/Create-S" },
      { label: "Payments To Supplier", route: "/screens/Supplier/Payment" },
      {
        label: "Reports",
        subItems: [
          { label: "Supplier Ledger", route: "/screens/Supplier/Supplier-Led" },
          {
            label: "List Of Payments",
            route: "/screens/Supplier/List-Of-Payments",
          },
        ],
      },
    ],
  },
  {
    trigger: "Account",
    items: [{ label: "Log-out", route: "/screens/Auth" }],
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
const Header = () => {
  return (
    <div className="">
      <HeaderPart menus={menuConfig} />
    </div>
  );
};

export default Header;
