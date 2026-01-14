import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

import { BottomSheet } from "./BottomSheet";
import { Text } from "./Text";
import type { DocumentType } from "@/lib/legal";
import {
  termsOfService,
  privacyPolicy,
  disclaimer,
  replacePlaceholders,
} from "@/lib/legal";

interface LegalSheetProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: DocumentType;
}

export function LegalSheet({ isOpen, onClose, documentType }: LegalSheetProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as "en" | "fr";

  // Get the correct document based on type
  const documentMap = {
    terms: termsOfService,
    privacy: privacyPolicy,
    disclaimer: disclaimer,
  };

  const legalContent = documentMap[documentType];
  const document = legalContent[language];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render a section's content (handles both string and string[])
  const renderContent = (content: string | string[]) => {
    if (typeof content === "string") {
      return (
        <Text variant="body" className="mb-3 leading-relaxed">
          {replacePlaceholders(content)}
        </Text>
      );
    }

    return (
      <>
        {content.map((paragraph, index) => (
          <Text key={index} variant="body" className="mb-3 leading-relaxed">
            {replacePlaceholders(paragraph)}
          </Text>
        ))}
      </>
    );
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={document.title}
      subtitle={t("legal.lastUpdated", { date: formatDate(document.lastUpdated) })}
      snapPoints={[0.9]}
      showHandle
      showCloseButton
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Effective Date */}
        <View className="mb-6">
          <Text variant="caption" className="text-text-muted">
            {t("legal.effectiveDate", { date: formatDate(document.effectiveDate) })}
          </Text>
        </View>

        {/* Sections */}
        {document.sections.map((section, index) => (
          <View key={index} className="mb-6">
            {/* Section Title */}
            <Text variant="h4" className="mb-3 font-inter-bold">
              {section.title}
            </Text>

            {/* Section Content */}
            {renderContent(section.content)}
          </View>
        ))}

        {/* Bottom Spacing */}
        <View className="h-4" />
      </ScrollView>
    </BottomSheet>
  );
}
