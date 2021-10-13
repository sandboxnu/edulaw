import Image from "next/image"

const divStyle = { width: '170px', height: '50px' } // TODO: figure out the right way to do this

export default function Logo({...props}) {
    return <div style={{ height: divStyle.height, width: divStyle.width, float: "left", margin: "33px"}}>
        <Image src="/logo.png"
            alt="EduLaw logo"
            layout="responsive"
            height={divStyle.height}
            width={divStyle.width}/>
    </div> // TODO: Make mobile responsive
}