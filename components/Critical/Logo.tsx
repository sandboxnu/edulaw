import Image from 'next/image'

const divStyle = { width: '170px', height: '50px' } // TODO: figure out the right way to do this

export default function Logo() {
  return (
    <div
      style={{
        height: divStyle.height,
        width: divStyle.width,
        margin: '33px',
      }}
    >
      <Image
        src="/EdLawLogo.png"
        alt="EduLaw logo"
        layout="responsive"
        height={divStyle.height}
        width={divStyle.width}
      />
    </div>
  ) // TODO: Make mobile responsive
}
