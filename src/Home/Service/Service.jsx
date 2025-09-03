import React from 'react';
import { 
  FaBrain, FaTooth, 
  FaFirstAid, 
  FaThermometerFull 
} from 'react-icons/fa';
import { FaHeartPulse } from "react-icons/fa6";
import { FcCollaboration } from "react-icons/fc";
import { FaLongArrowAltRight } from "react-icons/fa";

const Service = () => {
  const services = [
    {
      id: 1,
      icon: <FaHeartPulse className="text-4xl text-red-500" />,
      title: "Heart & Vascular",
      description: "Comprehensive cardiac services including heart disease prevention, diagnostics, and advanced treatment options.",
      number: "01"
    },
    {
      id: 2,
      icon: <FcCollaboration  className="text-4xl text-pink-500" />,
      title: "Labor & Delivery",
      description: "Exceptional maternity care with modern delivery suites, experienced obstetricians, and postpartum support.",
      number: "02"
    },
    {
      id: 3,
      icon: <FaFirstAid className="text-4xl text-blue-500" />,
      title: "Health care",
      description: "Complete family medicine services, preventive care, health screenings, and chronic disease management.",
      number: "03"
    },
    {
      id: 4,
      icon: <FaBrain className="text-4xl text-purple-500" />,
      title: "Neurology",
      description: "Expert diagnosis and treatment for neurological disorders, stroke care, and cognitive health management.",
      number: "04"
    },
    {
      id: 5,
      icon: <FaTooth className="text-4xl text-teal-500" />,
      title: "Dentist",
      description: "Complete oral health services including preventive, restorative, and cosmetic dentistry for all ages.",
      number: "05"
    },
    {
      id: 6,
      icon: <FaThermometerFull className="text-4xl text-orange-500" />,
      title: "Fevers",
      description: "Specialized treatment for infectious diseases, fever management, and comprehensive immunization services.",
      number: "06"
    }
  ];

  return (
    <div className='mx-4 md:mx-16 my-12 py-8'>
      <div className='text-center mb-12'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>Our Medical Services</h1>         
        <p className='text-gray-600 max-w-2xl mx-auto mt-4'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde accusamus culpa delectus, ducimus omnis doloribus quas porro quibusdam consequuntur tempora?
        </p> 
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 relative border border-gray-100"
          >
            
            
            {/* Icon */}
            <div className="mb-4">
              {service.icon}
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
            
            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
            
           <div className='flex justify-between items-center'>
                   {/* Read more link */}
            <div className="mt-6">
              <a 
                href="#" 
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center"
              >
                Learn more
                <FaLongArrowAltRight ></FaLongArrowAltRight>
              </a>
            </div>

            {/* Number badge */}
            <div className="absolute flex justify-end right-0 mt-7  bg-[#c184fb] text-white font-bold text-xl w-12 h-7 pr-2 rounded-sm ">
              {service.number}
            </div>
           </div>

          </div>
        ))}
      </div> 
    </div>
  );
};

export default Service;