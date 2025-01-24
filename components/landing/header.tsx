import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import ThemeButton from "@/components/shared/theme-button"


const Header = () => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between p-2 mx-6 my-2 lg:mx-12 lg:my-4 xl:mx-16 xl:my-6">
                <Link href="/discover">
                    <Image src="/images/logo-header.png" alt="MHDB" width={100} height={100} />
                </Link>
                <div className="flex gap-4 p-1">
                <Button asChild size="sm" variant={"ghost"}>
                    <Link href="/sign-in">Log in</Link>
                </Button>
                <ThemeButton />
                </div>
            </div>
        </div>
    )
}

export default Header