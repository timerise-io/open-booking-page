import React from "react";
import GlobalStyles from "styles/GlobalStyles";
import { AppLayoutWrapper } from "./components/layout/AppLayoutWrapper";
import Header from "components/Header";
import Footer from "components/Footer";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { apolloClient } from "api/apolloClient";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import PageSwitcher from "pages/PageSwitcher";
import "features/i18n";
import ThemeWrapper from "features/theme/components/ThemeWrapper";
import StateModal from "features/confirmation/components/StateModal";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <ApolloProvider client={apolloClient}>
          <ThemeWrapper>
            <GlobalStyles />
            <AppLayoutWrapper>
              <Header />
              <PageSwitcher>
                <StateModal />
              </PageSwitcher>
              <Footer />
            </AppLayoutWrapper>
          </ThemeWrapper>
        </ApolloProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
