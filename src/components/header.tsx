import Greeting from "./greeting";
import LuckyNumber from "./luckNumber";

function Header() {
    return (
        <>
            <header>
                <Greeting />
                <LuckyNumber />
            </header>
        </>
    );
}

export default Header;