# name: category-timeline
# about: Category timeline for Discourse
# version: 0.0.1
# authors: Vinoth Kannan (@vinothkannans)
# url: https://github.com/vinkashq/discourse-category-timeline

register_asset "stylesheets/category-timeline.scss"

after_initialize do

  class BasicCurrentTopicSerializer < BasicTopicSerializer

    attributes :deep_links

    def deep_links
      doc = Nokogiri::HTML::fragment(object.first_post.cooked)
      headings = doc.search('a[@href^="#"]') || []
      headings.map { |a| {title: a.text, href: a[:href]} }
    end

  end

  TopicViewSerializer.class_eval do

    attributes :timeline_topics

    def timeline_topics
      topics = Topic.where(category_id: category_id).order(:title).map do |topic|
        if id == topic.id
          BasicCurrentTopicSerializer.new(topic, scope: Guardian.new, root: false)
        else
          BasicTopicSerializer.new(topic, scope: Guardian.new, root: false)
        end
      end

      topics
    end

  end

end
