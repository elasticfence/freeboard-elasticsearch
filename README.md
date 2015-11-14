# freeboard-elasticsearch
Simple [Freeboard](https://github.com/Freeboard/freeboard) dashboards plugin for [Elasticsearch](https://github.com/elastic/elasticsearch) _(experimental)_


## Installing on an Elasticsearch instance:
<pre>
./elasticsearch/bin/plugin install lmangani/freeboard-elasticsearch/
</pre>

#### Config Loading Example

<pre>
freeboard.initialize(true);
  $.getJSON('path/to/freeboard.config.json', function(data) {
    freeboard.loadDashboard(data, function() {
      freeboard.setEditing(true);
    });
  });
</pre>

![](http://i.imgur.com/CvN5Zfl.png)
