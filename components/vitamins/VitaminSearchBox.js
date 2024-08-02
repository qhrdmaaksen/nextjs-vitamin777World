import {useRecoilState} from "recoil";
import {searchTermState} from "../../atoms/stateAtoms";
import {useRouter} from "next/router";

export const VitaminSearchBox = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

    const handleInputSearchSubmit = (e) => {
        e.preventDefault();

        router.push({
            pathname: `/search?query=${searchTerm}`,
        })

        setSearchTerm('');
    }
    return (
        <>
            <form onSubmit={handleInputSearchSubmit}>
            <input
                type="text"
                placeholder="제품을 입력해주세요."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />
            </form>
        </>
    )
}
export default VitaminSearchBox;