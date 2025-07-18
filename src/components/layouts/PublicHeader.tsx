import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import SearchBox from "@/components/post/SearchBox";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function PublicHeader() {
	return (
		<div>
			<header className="border-b bg-blue-200">
				<div className="container mx-auto px-4 py-4 flex justify-between">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink asChild className="font-bold text-xl">
									<Link href="/">Blog</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<div className="flex items-center gap-4">
						<SearchBox />
						<Button variant="outline" asChild>
							<Link href="/login">ログイン</Link>
						</Button>
						<Button asChild>
							<Link href="/register">登録</Link>
						</Button>
					</div>
				</div>
			</header>
		</div>
	);
}
