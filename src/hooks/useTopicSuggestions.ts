import { useState, useEffect, useRef, useCallback } from 'react';
import { TOPIC_SUGGESTIONS } from '../utils/constants';
import { TopicState } from '../types';

export function useTopicSuggestions() {
    const [topicState, setTopicState] = useState<TopicState>({
        topic: '',
        filteredSuggestions: [],
        showSuggestions: false
    });

    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on the current topic input
    useEffect(() => {
        if (topicState.topic.trim() === '') {
            setTopicState(prev => ({
                ...prev,
                filteredSuggestions: []
            }));
            return;
        }

        const filtered = TOPIC_SUGGESTIONS.filter(
            suggestion => suggestion.toLowerCase().includes(topicState.topic.toLowerCase())
        );

        setTopicState(prev => ({
            ...prev,
            filteredSuggestions: filtered
        }));
    }, [topicState.topic]);

    // Handle topic input change
    const handleTopicChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTopicState(prev => ({
            ...prev,
            topic: e.target.value,
            showSuggestions: true
        }));
    }, []);

    // Handle suggestion click
    const handleSuggestionClick = useCallback((suggestion: string) => {
        setTopicState(prev => ({
            ...prev,
            topic: suggestion,
            showSuggestions: false
        }));
    }, []);

    // Show suggestions
    const showSuggestionsDropdown = useCallback(() => {
        setTopicState(prev => ({
            ...prev,
            showSuggestions: true
        }));
    }, []);

    // Hide suggestions
    const hideSuggestionsDropdown = useCallback(() => {
        setTopicState(prev => ({
            ...prev,
            showSuggestions: false
        }));
    }, []);

    // Reset topic input
    const resetTopic = useCallback(() => {
        setTopicState(prev => ({
            ...prev,
            topic: '',
            showSuggestions: false
        }));
    }, []);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                !(event.target as HTMLElement).classList.contains('topic-input')
            ) {
                hideSuggestionsDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [hideSuggestionsDropdown]);

    return {
        topic: topicState.topic,
        filteredSuggestions: topicState.filteredSuggestions,
        showSuggestions: topicState.showSuggestions,
        suggestionsRef,
        handleTopicChange,
        handleSuggestionClick,
        showSuggestionsDropdown,
        hideSuggestionsDropdown,
        resetTopic
    };
} 