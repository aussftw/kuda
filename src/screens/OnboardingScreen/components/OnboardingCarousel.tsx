import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Animated,
  ViewToken,
  FlatList as FlatListType,
} from "react-native";

import MainButton from "../../../shared/components/MainButton/MainButton";
import { COLORS } from "../../../shared/constants";
import { slides } from "./slides";

type Slide = {
  id: string;
  title: string;
  description: string;
  image: ReturnType<typeof require>;
};

const { width } = Dimensions.get("window");

type OnboardingCarouselProps = {
  onComplete: () => void;
};

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatListType<Slide>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index });
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollTo(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const renderItem = ({ item }: { item: Slide }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Pagination />
          <MainButton
            style={styles.nextButton}
            title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
            onPress={handleNext}
          />
        </View>
      </View>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [COLORS.SECONDARY, COLORS.PRIMARY, COLORS.SECONDARY],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor,
                  marginHorizontal: 4,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={flatListRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 16,
    alignItems: "center",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width,
    height: width,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    paddingHorizontal: 24,
    paddingVertical: 36,
    borderRadius: 48,
    backgroundColor: COLORS.WHITE,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: COLORS.SECONDARY,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 25,
    marginTop: 32,
  },
});

export default OnboardingCarousel;
