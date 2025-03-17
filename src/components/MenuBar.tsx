import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function MenuBar() {
  return (
    <Menubar className="h-10">
      {/* Home Menu */}
      <MenubarMenu>
        <MenubarTrigger>Home</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Welcome</MenubarItem>
          <MenubarItem>About Us</MenubarItem>
          <MenubarItem>Our Story</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Shop Menu */}
      <MenubarMenu>
        <MenubarTrigger>Shop</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>All Products</MenubarItem>
          <MenubarItem>Categories</MenubarItem>
          <MenubarItem>Best Sellers</MenubarItem>
          <MenubarItem>New Arrivals</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Cart */}
      <MenubarMenu>
        <MenubarTrigger>Cart</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Your Cart</MenubarItem>
          <MenubarItem>Checkout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Profile */}
      <MenubarMenu>
        <MenubarTrigger>Profile</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Account Settings</MenubarItem>
          <MenubarItem>Orders</MenubarItem>
          <MenubarItem>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Contact */}
      <MenubarMenu>
        <MenubarTrigger>Contact</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Contact Us</MenubarItem>
          <MenubarItem>FAQs</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
