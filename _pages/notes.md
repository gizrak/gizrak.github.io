---
layout: single
title: "Notes"
permalink: /notes/
author_profile: true
toc: false
---

<div class="notes-index">
<p class="notes-index__intro">정리한 용어·개념 문서 목록입니다. 카테고리별로 묶었습니다.</p>

{% assign groups = site.notes | group_by: "category" | sort: "name" %}
{% for group in groups %}
{% assign cat_name = group.name | remove: '["' | remove: '"]' | strip %}

<div class="notes-category">
<h3 class="notes-category__title">{{ cat_name }}</h3>
{% assign sorted = group.items | sort: "title" %}
<ul class="notes-category__list">
{% for item in sorted %}
{% if item.hidden != true %}
<li><a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
{% endif %}
{% endfor %}
</ul>
</div>
{% endfor %}
</div>
