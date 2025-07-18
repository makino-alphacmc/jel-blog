import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
						<Input
							placeholder="記事を検索..."
							className="w-[200px] lg:w-[300px} bg-white"
						/>
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
