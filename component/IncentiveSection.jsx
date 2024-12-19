// import Image from "next/image";
// import React from "react";

// import Moneybag from "@/public/bag_of_money_black.svg";

// const IncentiveSection = () => {
//   return (
//     <div className="bg-blue-500 mx-5 mb-10 text-white flex justify-center items-center p-8 rounded-lg mt-10">
//       <div className="flex flex-wrap gap-10 items-start incentiveBottomSection justify-center">
//         {/* Regular Points Section */}
//         <div className="grid gap-3">
//           <p>
//             Your regular points: <b>500pt</b>
//           </p>
//           <p>
//             Your actual regular points: <b>400pt</b>
//           </p>
//           <p>
//             Cash value for every regular point: <b>20 Taka</b>
//           </p>
//           <p>
//             Final incentive amount for the <br /> regular points:{" "}
//             <b>400 * 20 = 8000 Taka</b>
//           </p>
//         </div>

        

//         {/* Upsale/Cross Sale Section */}
//         <div className="grid gap-3">
//           <p>
//             Your upsale/cross sale points: <b>60.05 pt</b>
//           </p>
//           <p>
//             Cash value for upsale cross points: <b>100 Taka</b>
//           </p>
//           <p>
//             Incentive amount from the upsale/cross <br /> sales points:{" "}
//             <b>60.05 * 100 = 6005 Taka</b>
//           </p>
//         </div>

        

//         {/* Bonus Points Section */}
//         <div className="grid gap-3">
//           <p>
//             Your bonus points based on released amount: <b>20</b>
//           </p>
//           <p>
//             Cash value for bonus points: <b>100 Taka</b>
//           </p>
//           <p>
//             Incentive amount from bonus points: <b>20 * 100 = 2000 Taka</b>
//           </p>
//         </div>


//         {/* Final Incentive Amount Section */}
//         <div className="col-span-4 text-center bg-white p-2 rounded-lg text-black">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-10 h-10 bg-secoundary_background p-3 rounded-lg flex items-center justify-center">
//               <Image src={Moneybag} height={40} width={40} alt="Money Bag" />
//             </div>
//           </div>
//           <p>Your final incentive amount:</p>
//           <h2 className="text-3xl font-bold">16005 Taka</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IncentiveSection;



import Image from "next/image";
import React from "react";
import Moneybag from "@/public/bag_of_money_black.svg";

const IncentiveSection = () => {
  return (
    <div className="bg-blue-500 mx-5 mb-10 text-white flex justify-center items-center p-8 rounded-lg mt-10">
      <div className="flex gap-10 items-start incentiveBottomSection justify-center">
        {/* Regular Points Section */}
        <div className="grid gap-3">
          <p>
            Your regular points: <b>500pt</b>
          </p>
          <p>
            Your actual regular points: <b>400pt</b>
          </p>
          <p>
            Cash value for every regular point: <b>20 Taka</b>
          </p>
          <p>
            Final incentive amount for the <br /> regular points:{" "}
            <b>400 * 20 = 8000 Taka</b>
          </p>
        </div>

        {/* Divider */}
        <div className="h-full border-r-2 border-white my-6" />

        {/* Upsale/Cross Sale Section */}
        <div className="grid gap-3">
          <p>
            Your upsale/cross sale points: <b>60.05 pt</b>
          </p>
          <p>
            Cash value for upsale cross points: <b>100 Taka</b>
          </p>
          <p>
            Incentive amount from the upsale/cross <br /> sales points:{" "}
            <b>60.05 * 100 = 6005 Taka</b>
          </p>
        </div>

        {/* Divider */}
        <div className="h-full border-r-2 border-white my-6" />

        {/* Bonus Points Section */}
        <div className="grid gap-3">
          <p>
            Your bonus points based on released amount: <b>20</b>
          </p>
          <p>
            Cash value for bonus points: <b>100 Taka</b>
          </p>
          <p>
            Incentive amount from bonus points: <b>20 * 100 = 2000 Taka</b>
          </p>
        </div>

        {/* Divider */}
        <div className="h-full border-r-2 border-white my-6" />

        {/* Final Incentive Amount Section */}
        <div className="col-span-4 text-center bg-white p-2 rounded-lg text-black">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-secoundary_background p-3 rounded-lg flex items-center justify-center">
              <Image src={Moneybag} height={40} width={40} alt="Money Bag" />
            </div>
          </div>
          <p>Your final incentive amount:</p>
          <h2 className="text-3xl font-bold">16005 Taka</h2>
        </div>
      </div>
    </div>
  );
};

export default IncentiveSection;
