type SummaryCardProps={
    title:string;
    value:string | number;
}

function SummaryCard({title,value}:SummaryCardProps){
    return (
        <>
        <div className="bg-white  p-4  rounded-lg shadow">
            <h2 className="text-gray-500">{title}</h2>
            <h2 className="text-gray-600">{value}</h2>
        </div>
        </>
    )
}