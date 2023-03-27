import React from "react";
import MainSection from "../components/MainSection";
import SideSection from "../components/SideSection";

import WriteFormModal from "../components/WriteFormModal";
import MainLayout from "../layouts/MainLayout";
import FooterLayout from "../layouts/FooterLayout";
const HomePage = () => {
  return (
    <MainLayout>
      <section className="mainSectionBox font-supermercado grid grid-cols-12">
        <MainSection />
        <SideSection />
      </section>
      <WriteFormModal />
      <FooterLayout />
    </MainLayout>
  );
};

export default HomePage;
