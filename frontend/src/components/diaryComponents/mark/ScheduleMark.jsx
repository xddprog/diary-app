import styled from "styled-components"
import { FlexRow } from "../../BaseComponents"


export default function Marks({marks}) {
    return (
        <>
            <MarksContainer>
                {[marks.map(item => {
                    return (
                        <MarksWrapper>
                            {item.mark_value}
                        </MarksWrapper>
                    )
                })]}
            </MarksContainer>
        </>
    )
}


const MarksContainer = styled.div`
    width: 30px;
    display: flex;
    align-items: start;
    justify-content: start;
`

const MarksWrapper = styled.div`
    padding: 5px 10px;
    border: #e5e7eb solid 1px;
    margin-right: 10px;
    border-radius: 0px;
`