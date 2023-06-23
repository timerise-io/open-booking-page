import React from "react";
import { apolloClient } from "api/apolloClient";
import Footer from "components/Footer";
import Header from "components/Header";
import StateModal from "features/confirmation/components/StateModal";
import "features/i18n";
import ThemeWrapper from "features/theme/components/ThemeWrapper";
import PageSwitcher from "pages/PageSwitcher";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import GlobalStyles from "styles/GlobalStyles";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { AppLayoutWrapper } from "./components/layout/AppLayoutWrapper";

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
