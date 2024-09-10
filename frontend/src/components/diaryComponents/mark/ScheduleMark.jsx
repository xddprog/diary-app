

function Marks({marks}) {
    return (
        <>
            <div
                style={{
                    width: '30px',
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                {[marks.map(item => {
                    return (
                        <div
                            style={{
                                padding: '5px 10px',
                                border: '#e5e7eb solid 1px',
                                marginRight: '10px',
                                borderRadius: '0px'
                            }}
                        >
                            {item.mark_value}
                        </div>
                    )
                })]}
            </div>
        </>
    )
}

export default Marks;