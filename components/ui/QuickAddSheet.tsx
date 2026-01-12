import { View, ScrollView, Pressable } from "react-native";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

import { BottomSheet } from "./BottomSheet";
import { SearchInput } from "./SearchInput";
import { Text } from "./Text";
import { Avatar } from "./Avatar";
import { SectionHeader } from "./SectionHeader";
import { colors } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { useWatchlistStore, useUIStore } from "@/lib/store";
import { searchPoliticians, getMostActivePoliticians } from "@/lib/mockData";

interface QuickAddSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickAddSheet({ isOpen, onClose }: QuickAddSheetProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { addPolitician, isFollowingPolitician } = useWatchlistStore();
  const { showToast } = useUIStore();

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchPoliticians(searchQuery).slice(0, 8);
  }, [searchQuery]);

  const topPoliticians = useMemo(() => {
    return getMostActivePoliticians(10);
  }, []);

  const handleAdd = (politicianId: string) => {
    haptics.light();
    addPolitician(politicianId);

    // Show success toast
    showToast(t("watchlist.added"));

    // Close after a short delay
    setTimeout(() => {
      setSearchQuery("");
      onClose();
    }, 300);
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      title={t("watchlist.addPolitician")}
      subtitle={t("watchlist.searchToAdd")}
      snapPoints={[0.8]}
      showHandle
      showCloseButton
    >
      <View className="flex-1">
        {/* Search Input */}
        <View className="px-4 pt-3 pb-2">
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t("search.placeholder")}
            autoFocus
          />
        </View>

        {/* Results */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {searchQuery.trim() === "" ? (
            // Top 10 politicians
            <>
              <SectionHeader
                title={t("watchlist.mostActive")}
                className="px-4 mb-3"
              />
              <View className="bg-surface-primary rounded-2xl overflow-hidden">
                {topPoliticians.map((politician, index) => {
                  const isFollowing = isFollowingPolitician(politician.id);

                  return (
                    <View
                      key={politician.id}
                      style={
                        index < topPoliticians.length - 1
                          ? {
                              borderBottomWidth: 1,
                              borderBottomColor: colors.background.border,
                            }
                          : undefined
                      }
                    >
                      <View className="flex-row items-center p-3 gap-3">
                        <Avatar
                          initials={politician.initials}
                          imageUrl={politician.photoUrl}
                          size="md"
                          party={politician.party}
                          showPartyIndicator
                        />
                        <View className="flex-1 min-w-0">
                          <Text variant="body" className="font-inter-semibold">
                            {politician.name}
                          </Text>
                          <Text variant="caption" numberOfLines={1}>
                            {politician.position || `${politician.chamber} - ${politician.state}`}
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => handleAdd(politician.id)}
                          disabled={isFollowing}
                          className={`w-9 h-9 rounded-full items-center justify-center ${
                            isFollowing ? "bg-surface-secondary" : "bg-primary"
                          } active:opacity-70`}
                        >
                          <Ionicons
                            name={isFollowing ? "checkmark" : "add"}
                            size={20}
                            color={
                              isFollowing ? colors.text.secondary : colors.text.inverse
                            }
                          />
                        </Pressable>
                      </View>
                    </View>
                  );
                })}
              </View>
            </>
          ) : results.length === 0 ? (
            // No results
            <View className="items-center justify-center py-12">
              <View className="w-16 h-16 rounded-full bg-surface-secondary items-center justify-center mb-4">
                <Ionicons
                  name="search-outline"
                  size={32}
                  color={colors.text.muted}
                />
              </View>
              <Text variant="body" className="text-text-secondary" align="center">
                {t("search.noResults")}
              </Text>
            </View>
          ) : (
            // Results list
            <View className="bg-surface-primary rounded-2xl overflow-hidden">
              {results.map((politician, index) => {
                const isFollowing = isFollowingPolitician(politician.id);

                return (
                  <View
                    key={politician.id}
                    style={
                      index < results.length - 1
                        ? {
                            borderBottomWidth: 1,
                            borderBottomColor: colors.background.border,
                          }
                        : undefined
                    }
                  >
                    <View className="flex-row items-center p-3 gap-3">
                      <Avatar
                        initials={politician.initials}
                        imageUrl={politician.photoUrl}
                        size="md"
                        party={politician.party}
                        showPartyIndicator
                      />
                      <View className="flex-1 min-w-0">
                        <Text variant="body" className="font-inter-semibold">
                          {politician.name}
                        </Text>
                        <Text variant="caption" numberOfLines={1}>
                          {politician.position || `${politician.chamber} - ${politician.state}`}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => handleAdd(politician.id)}
                        disabled={isFollowing}
                        className={`w-9 h-9 rounded-full items-center justify-center ${
                          isFollowing ? "bg-surface-secondary" : "bg-primary"
                        } active:opacity-70`}
                      >
                        <Ionicons
                          name={isFollowing ? "checkmark" : "add"}
                          size={20}
                          color={
                            isFollowing ? colors.text.secondary : colors.text.inverse
                          }
                        />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </BottomSheet>
  );
}
