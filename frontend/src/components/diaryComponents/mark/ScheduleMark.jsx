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


const MarksContainer = styled(FlexRow)`
    width: 30px;
`

const MarksWrapper = styled.div`
    padding: 5px 10px;
    border: #e5e7eb solid 1px;
    margin-right: 10px;
    border-radius: 0px
`